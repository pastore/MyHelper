using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Exceptions;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Tag
{
    public class TagAdminService : BaseService, ITagAdminService
    {
        public TagAdminService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<ServerResponse<List<TagAdminResponse>>> GetAdminTagsAsync()
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = _myHelperDbContext.Tags.Select(x => new TagAdmin()
                {
                    Id = x.Id,
                    Name = x.Name,
                    Notes = x.NoteTags.Select(y => y.Note.Name).ToArray(),
                    Tasks = x.MhTaskTags.Select(z => z.MhTask.Name).ToArray()
                }).Select(r => _mapper.Map<TagAdmin, TagAdminResponse>(r));

                return ServerResponseBuilder.Build(await query.ToListAsync());
            });
        }

        public async Task<ServerResponse<bool>> DeleteTagAsync(long id)
        {
            return await BaseInvokeAsync(async () =>
            {
                var tag = await _myHelperDbContext.Tags.FirstOrDefaultAsync(x => x.Id == id);

                if (tag == null)
                    throw new NotFoundException(Constants.Errors.TagNotExists);

                _myHelperDbContext.Tags.Remove(tag);
                await _myHelperDbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            });
        }

    } 
}