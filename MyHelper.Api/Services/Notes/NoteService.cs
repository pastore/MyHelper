using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Feed;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Notes
{
    public class NoteService: BaseService, INoteService
    {
        public NoteService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<AOResult<List<NoteResponse>>> GetNotesAsync(int accountId, NoteFilterRequest noteFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = _myHelperDbContext.Notes
                    .Include(x => x.NoteTags)
                    .ThenInclude(e => e.Tag)
                    .Where(x => x.AppUserId == accountId)
                    .AsQueryable();

                query = FilterNotes(query, noteFilterRequest);

                query = query.OrderByDescending(x => x.Id);

                query = FetchItems(query, noteFilterRequest);

                return AOBuilder.SetSuccess(await query.ToAsyncEnumerable().Select(x => _mapper.Map<Note, NoteResponse>(x)).ToList());
            });
        }

        public async Task<AOResult<NoteResponse>> GetNoteAsync(int accountId, long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var note = await _myHelperDbContext.Notes.FirstOrDefaultAsync(x => x.Id == id  && x.AppUserId == accountId);

                if (note == null)
                    return AOBuilder.SetError<NoteResponse>(Constants.Errors.TaskNotExists);

                return AOBuilder.SetSuccess(_mapper.Map<Note, NoteResponse>(note));
            });
        }

        public async Task<AOResult<long>> CreateNoteAsync(NoteRequest noteRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var note = new Note
                {
                    Name = noteRequest.Name,
                    Description = noteRequest.Description,
                    UpdateDate = DateTime.Now,
                    AppUserId = noteRequest.AppUserId
                };

                await _myHelperDbContext.Notes.AddAsync(note);

                if (noteRequest.TagIds.Any())
                {
                    var noteTags = noteRequest.TagIds
                    .Join(_myHelperDbContext.Tags, o => o, i => i.Id, (o, i) => i)
                    .Select(x => new NoteTag
                    {
                        Note = note,
                        Tag = x
                    });

                    await _myHelperDbContext.NoteTags.AddRangeAsync(noteTags);
                }

                await _myHelperDbContext.SaveChangesAsync();

                return AOBuilder.SetSuccess(note.Id);
            }, noteRequest);
        }

        public async Task<AOResult> UpdateNoteAsync(NoteRequest noteRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                Note note = await _myHelperDbContext.Notes.FirstOrDefaultAsync(x => x.Id == noteRequest.Id); 

                if (note == null)
                    return AOBuilder.SetError(Constants.Errors.NoteNotExists);

                note.Name = noteRequest.Name;
                note.Description = noteRequest.Description;
                note.UpdateDate = DateTime.Now;

                _myHelperDbContext.Notes.Update(note);

                var noteTags = await _myHelperDbContext.NoteTags.Where(x => x.NoteId == note.Id).ToListAsync();
                _myHelperDbContext.NoteTags.RemoveRange(noteTags.Where(x => !noteRequest.TagIds.Contains(x.TagId)));

                await _myHelperDbContext.NoteTags.AddRangeAsync(
                    noteRequest.TagIds
                        .Join(_myHelperDbContext.Tags, o => o, i => i.Id, (o, i) => i)
                        .Where(x => !noteTags.Select(y => y.TagId).Contains(x.Id))
                        .Select(x => new NoteTag { Tag = x, Note = note }));

                await _myHelperDbContext.SaveChangesAsync();

                return AOBuilder.SetSuccess();
            }, noteRequest);
        }

        public async Task<AOResult> DeleteNoteAsync(long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var note = await _myHelperDbContext.Notes.FirstOrDefaultAsync(x => x.Id == id);

                if (note == null)
                    return AOBuilder.SetError(Constants.Errors.NoteNotExists);

                _myHelperDbContext.Notes.Remove(note);
                await _myHelperDbContext.SaveChangesAsync();

                return AOBuilder.SetSuccess();
            });
        }

        public FeedMessage CreateNoteFeedMessage(NoteRequest noteRequest, long sourceId)
        {
            var noteFeedData = new NoteFeedData
            {
                SourceId = sourceId,
                Name = noteRequest.Name,
                Description = noteRequest.Description
            };
            var noteFeedDataJson = JsonConvert.SerializeObject(noteFeedData);

            return new FeedMessage()
            {
                AppUserId = noteRequest.AppUserId,
                CreateDate = DateTime.Now,
                FeedType = EFeedType.CreateNote,
                FeedData = noteFeedDataJson
            };
        }

        #region -- Private methods --

        private IQueryable<Note> FilterNotes(IQueryable<Note> query, NoteFilterRequest noteFilterRequest)
        {
            if (noteFilterRequest.FromDate.HasValue)
            {
                query = query.Where(x => x.CreateDate >= noteFilterRequest.FromDate.Value);
            }

            if (noteFilterRequest.ToDate.HasValue)
            {
                query = query.Where(x => x.CreateDate <= noteFilterRequest.ToDate.Value);
            }

            if (!string.IsNullOrWhiteSpace(noteFilterRequest.Search))
            {
                query = query.Where(x => x.Name.ToLower().Contains(noteFilterRequest.Search.ToLower()));
            }

            if (noteFilterRequest.TagIds.Any())
            {
                query = query.Where(x => x.NoteTags.Any(tag => noteFilterRequest.TagIds.Any(t => t == tag.Tag.Id)));
            }

            return query;
        }

        #endregion
    }
}
