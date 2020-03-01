using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Notes;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Notes;
using MyHelper.Api.Services.Token;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [ApiVersion("1.0")]
    [Route("api/v{ver:apiVersion}/notes")]
    public class NotesController : BaseController
    {
        private readonly INoteService _noteService;
        private readonly IRequestClient<IFeedMessage> _requestClient;

        public NotesController(
            INoteService noteService,
            ITokenService tokenService,
            IRequestClient<IFeedMessage> requestClient) : base(tokenService)
        {
            _noteService = noteService;
            _requestClient = requestClient;
        }

        [HttpGet]
        public async Task<ServerResponse<List<NoteResponse>>> GetNotesAsync(NoteFilterRequest noteFilterRequest)
        {
            return await _noteService.GetNotesAsync(AccountId, noteFilterRequest);
        }

        [HttpGet("{id}")]
        public async Task<ServerResponse<NoteResponse>> GetNoteAsync(long id)
        {
            return await _noteService.GetNoteAsync(AccountId, id);
        }

        [HttpPost]
        public async Task<ServerResponse<long>> CreateNoteAsync([FromBody] NoteRequest noteRequest)
        {
            return await _noteService.CreateNoteAsync(noteRequest).ContinueWith(x =>
            {
                var request = _requestClient.Create(_noteService.CreateNoteFeedMessage(noteRequest, x.Result.Result));

                request.GetResponse<FeedMessage>();

                return x.Result;
            });
        }

        [HttpPut]
        public async Task<ServerResponse<bool>> UpdateNoteAsync([FromBody] NoteRequest noteRequest)
        {
            return await _noteService.UpdateNoteAsync(noteRequest);
        }

        [HttpDelete("{id}")]
        public async Task<ServerResponse<bool>> DeleteNotekAsync(long id)
        {
            return await _noteService.DeleteNoteAsync(id);
        }
    }
}