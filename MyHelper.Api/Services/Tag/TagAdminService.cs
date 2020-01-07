using AutoMapper;
using Microsoft.EntityFrameworkCore;
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
                    Name = x.Name,
                    Notes = x.NoteTags.Select(y => y.Note.Name).ToArray(),
                    Tasks = x.MhTaskTags.Select(z => z.MhTask.Name).ToArray()
                }).Select(r => _mapper.Map<TagAdmin, TagAdminResponse>(r));

                return ServerResponseBuilder.Build(await query.ToListAsync());
            });
        }
    } 
}