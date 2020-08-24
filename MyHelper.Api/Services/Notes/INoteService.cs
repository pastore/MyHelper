using MyHelper.Api.Core;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Notes;
using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Notes
{
    public interface INoteService
    {
        Task<ServerResponse<List<NoteResponse>>> GetNotesAsync(long accountId, NoteFilterRequest noteFilterRequest);

        Task<ServerResponse<NoteResponse>> GetNoteAsync(long accountId, long id);

        Task<ServerResponse<long>> CreateNoteAsync(NoteRequest noteRequest);

        Task<ServerResponse<bool>> UpdateNoteAsync(NoteRequest noteRequest);

        Task<ServerResponse<bool>> DeleteNoteAsync(long id);

        FeedMessage CreateFeedMessage<T>(T noteRequest, EFeedAction feedAction);
    }
}
