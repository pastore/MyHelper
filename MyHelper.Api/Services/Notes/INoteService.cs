using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Threading.Tasks;
using MyHelper.Api.Models.Messanging;

namespace MyHelper.Api.Services.Notes
{
    public interface INoteService
    {
        Task<AOResult<List<NoteResponse>>> GetNotesAsync(int accountId, NoteFilterRequest noteFilterRequest);

        Task<AOResult<NoteResponse>> GetNoteAsync(int accountId, long id);

        Task<AOResult<long>> CreateNoteAsync(NoteRequest noteRequest);

        Task<AOResult> UpdateNoteAsync(NoteRequest noteRequest);

        Task<AOResult> DeleteNoteAsync(long id);

        FeedMessage CreateNoteFeedMessage(NoteRequest noteRequest, long sourceId);
    }
}
