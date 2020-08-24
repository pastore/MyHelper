using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Exceptions;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Notes;
using MyHelper.Api.Models.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Notes
{
    public class NoteService: BaseService<MyHelperContext>, INoteService
    {
        public NoteService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<ServerResponse<List<NoteResponse>>> GetNotesAsync(long accountId, NoteFilterRequest noteFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = DbContext.Notes
                    .AsQueryable()
                    .Include(x => x.NoteTags)
                    .ThenInclude(e => e.Tag)
                    .Where(x => x.AppUserId == accountId);

                query = FilterNotes(query, noteFilterRequest);

                query = query.OrderByDescending(x => x.Id);

                query = FetchItems(query, noteFilterRequest);

                return ServerResponseBuilder.Build(await query.ToAsyncEnumerable()
                    .Select(x => Mapper.Map<Note, NoteResponse>(x)).ToListAsync());
            });
        }

        public async Task<ServerResponse<NoteResponse>> GetNoteAsync(long accountId, long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var note = await DbContext.Notes
                    .AsQueryable()
                    .FirstOrDefaultAsync(x => x.Id == id  && x.AppUserId == accountId);

                if (note == null)
                    throw new NotFoundException(Constants.Errors.NoteNotExists);

                return ServerResponseBuilder.Build(Mapper.Map<Note, NoteResponse>(note));
            });
        }

        public async Task<ServerResponse<long>> CreateNoteAsync(NoteRequest noteRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var note = new Note
                {
                    Name = noteRequest.Name,
                    Description = noteRequest.Description,
                    VisibleType = noteRequest.VisibleType,
                    UpdateDate = DateTime.Now,
                    AppUserId = noteRequest.AppUserId
                };

                await DbContext.Notes.AddAsync(note);

                if (noteRequest.TagIds.Any())
                {
                    var noteTags = noteRequest.TagIds
                    .Join(DbContext.Tags, o => o, i => i.Id, (o, i) => i)
                    .Select(x => new NoteTag
                    {
                        Note = note,
                        Tag = x
                    });

                    await DbContext.NoteTags.AddRangeAsync(noteTags);
                }

                await DbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(note.Id);
            }, noteRequest);
        }

        public async Task<ServerResponse<bool>> UpdateNoteAsync(NoteRequest noteRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                Note note = await DbContext.Notes
                    .AsQueryable()
                    .FirstOrDefaultAsync(x => x.Id == noteRequest.Id); 

                if (note == null)
                    throw new NotFoundException(Constants.Errors.NoteNotExists);

                note.Name = noteRequest.Name;
                note.Description = noteRequest.Description;
                note.VisibleType = noteRequest.VisibleType;
                note.UpdateDate = DateTime.Now;

                DbContext.Notes.Update(note);

                var noteTags = await DbContext.NoteTags
                    .AsQueryable()
                    .Where(x => x.NoteId == note.Id).ToListAsync();
                DbContext.NoteTags
                    .RemoveRange(noteTags.Where(x => !noteRequest.TagIds.Contains(x.TagId)));

                await DbContext.NoteTags.AddRangeAsync(
                    noteRequest.TagIds
                        .Join(DbContext.Tags, o => o, i => i.Id, (o, i) => i)
                        .Where(x => !noteTags.Select(y => y.TagId).Contains(x.Id))
                        .Select(x => new NoteTag { Tag = x, Note = note }));

                await DbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            }, noteRequest);
        }

        public async Task<ServerResponse<bool>> DeleteNoteAsync(long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var note = await DbContext.Notes
                    .AsQueryable()
                    .FirstOrDefaultAsync(x => x.Id == id);

                if (note == null)
                    throw new NotFoundException(Constants.Errors.NoteNotExists);

                DbContext.Notes.Remove(note);
                await DbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            });
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
