using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Core;
using MyHelper.Api.Models.Notes;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Notes;
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
        private readonly ISendEndpointProvider _sendEndpointProvider;

        public NotesController(
            INoteService noteService,
            ISendEndpointProvider sendEndpointProvider)
        {
            _noteService = noteService;
            _sendEndpointProvider = sendEndpointProvider;
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
            var serverResponse = await _noteService.CreateNoteAsync(noteRequest);

            noteRequest.Id = serverResponse.Result;
            await _sendEndpointProvider.Send(_noteService.CreateFeedMessage(noteRequest, EFeedAction.Create));

            return serverResponse;
        }

        [HttpPut]
        public async Task<ServerResponse<bool>> UpdateNoteAsync([FromBody] NoteRequest noteRequest)
        {
            var serverResponse = await _noteService.UpdateNoteAsync(noteRequest);

            await _sendEndpointProvider.Send(_noteService.CreateFeedMessage(noteRequest, EFeedAction.Update));

            return serverResponse;
        }

        [HttpDelete("{id}")]
        public async Task<ServerResponse<bool>> DeleteNotekAsync(long id)
        {
            var serverResponse = await _noteService.DeleteNoteAsync(id);

            await _sendEndpointProvider.Send(
                _noteService.CreateFeedMessage(new NoteRequest {Id = id, AppUserId = AccountId}, EFeedAction.Delete));

            return serverResponse;
        }
    }
}