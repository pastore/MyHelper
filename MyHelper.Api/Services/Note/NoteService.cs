using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;

namespace MyHelper.Api.Services.Note
{
    public class NoteService: BaseService, INoteService
    {
        public NoteService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<AOResult<List<NoteResponse>>> GetNotesAsync(NoteFilterRequest noteFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = _myHelperDbContext.Notes.Include(x => x.NoteTags).ThenInclude(e => e.Tag).AsQueryable();

                FilterNotes(query, noteFilterRequest);

                return AOBuilder.SetSuccess(await query.ToAsyncEnumerable().Select(x => _mapper.Map<DAL.Entities.Note, NoteResponse>(x)).ToList());
            });
        }

        public async Task<AOResult<NoteResponse>> GetNoteAsync(long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var note = await _myHelperDbContext.Notes.FirstOrDefaultAsync(x => x.Id == id);

                if (note == null)
                    return AOBuilder.SetError<NoteResponse>(Constants.Errors.TaskNotExists);

                return AOBuilder.SetSuccess(_mapper.Map<DAL.Entities.Note, NoteResponse>(note));
            });
        }

        public async Task<AOResult> CreateNoteAsync(NoteRequest noteRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var note = new DAL.Entities.Note
                {
                    Name = noteRequest.Name,
                    Description = noteRequest.Description,
                    UpdateDate = DateTime.Now,
                };

                await _myHelperDbContext.Notes.AddAsync(note);
                await _myHelperDbContext.SaveChangesAsync();


                if (noteRequest.TagIds.Any())
                {
                    var noteTags = noteRequest.TagIds.Select(x => new NoteTag
                    {
                        NoteId = note.Id,
                        TagId = x
                    });

                    await _myHelperDbContext.NoteTags.AddRangeAsync(noteTags);
                    await _myHelperDbContext.SaveChangesAsync();
                }

                return AOBuilder.SetSuccess();
            }, noteRequest);
        }

        public async Task<AOResult> UpdateNoteAsync(NoteRequest noteRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                DAL.Entities.Note note = await _myHelperDbContext.Notes.FirstOrDefaultAsync(x => x.Id == noteRequest.Id); ;


                if (note == null)
                    return AOBuilder.SetError(Constants.Errors.NoteNotExists);

                note.Name = noteRequest.Name;
                note.Description = noteRequest.Description;
                note.UpdateDate = DateTime.Now;

                _myHelperDbContext.Notes.Update(note);
                await _myHelperDbContext.SaveChangesAsync();

                var noteTags = await _myHelperDbContext.NoteTags.Where(x => x.NoteId == note.Id).ToListAsync();
                _myHelperDbContext.NoteTags.RemoveRange(noteTags.Where(x => !noteRequest.TagIds.Contains(x.Tag.Id)));

                await _myHelperDbContext.NoteTags.AddRangeAsync(noteRequest.TagIds
                    .Where(x => !noteTags.Contains(new NoteTag { TagId = x, NoteId = note.Id }))
                    .Select(x => new NoteTag { TagId = x, NoteId = note.Id }));
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

        #region -- Private methods --

        private void FilterNotes(IQueryable<DAL.Entities.Note> query, NoteFilterRequest noteFIlterRequest)
        {
            if (noteFIlterRequest.FromDate.HasValue)
            {
                query = query.Where(x => x.CreateDate >= noteFIlterRequest.FromDate.Value);
            }

            if (noteFIlterRequest.ToDate.HasValue)
            {
                query = query.Where(x => x.CreateDate <= noteFIlterRequest.ToDate.Value);
            }

            if (noteFIlterRequest.TagIds.Any())
            {
                query = query.Where(x => x.NoteTags.Any(mhtag => noteFIlterRequest.TagIds.Any(t => t == mhtag.Tag.Id)));
            }
        }

        #endregion
    }
}
