using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;

namespace MyHelper.Api.Services.Note
{
    public interface INoteService
    {
        Task<AOResult<List<NoteResponse>>> GetNotesAsync(NoteFilterRequest noteFilterRequest);

        Task<AOResult<NoteResponse>> GetNoteAsync(long id);

        Task<AOResult> CreateNoteAsync(NoteRequest noteRequest);

        Task<AOResult> UpdateNoteAsync(NoteRequest noteRequest);

        Task<AOResult> DeleteNoteAsync(long id);
    }
}
