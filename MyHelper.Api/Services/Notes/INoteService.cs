using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Notes
{
    public interface INoteService
    {
        Task<ServerResponse<List<NoteResponse>>> GetNotesAsync(int accountId, NoteFilterRequest noteFilterRequest);

        Task<ServerResponse<NoteResponse>> GetNoteAsync(int accountId, long id);

        Task<ServerResponse<long>> CreateNoteAsync(NoteRequest noteRequest);

        Task<ServerResponse<bool>> UpdateNoteAsync(NoteRequest noteRequest);

        Task<ServerResponse<bool>> DeleteNoteAsync(long id);

        FeedMessage CreateNoteFeedMessage(NoteRequest noteRequest, long sourceId);
    }
}
