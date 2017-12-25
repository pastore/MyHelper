using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Services.Note;

namespace MyHelper.Api.Controllers
{
    [Authorize]
    [Route("api/notes")]
    public class NotesController : BaseController
    {
        private readonly INoteService _noteService;

        public NotesController(INoteService noteService)
        {
            _noteService = noteService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ServerResponse<List<NoteResponse>>), 200)]
        public async Task<ServerResponse<List<NoteResponse>>> GetNotesAsync(NoteFilterRequest noteFilterRequest)
        {
            return AOResultToServerResponse(await _noteService.GetNotesAsync(noteFilterRequest));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(ServerResponse<NoteResponse>), 200)]
        public async Task<ServerResponse<NoteResponse>> GetNoteAsync(long id)
        {
            return AOResultToServerResponse(await _noteService.GetNoteAsync(id));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> CreateNoteAsync([FromBody] NoteRequest noteRequest)
        {
            return AOResultToServerResponse(await _noteService.CreateNoteAsync(noteRequest));
        }

        [HttpPut]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> UpdateNoteAsync([FromBody] NoteRequest noteRequest)
        {
            return AOResultToServerResponse(await _noteService.UpdateNoteAsync(noteRequest));
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(ServerResponse), 200)]
        public async Task<ServerResponse> DeleteNotekAsync(long id)
        {
            return AOResultToServerResponse(await _noteService.DeleteNoteAsync(id));
        }
    }
}