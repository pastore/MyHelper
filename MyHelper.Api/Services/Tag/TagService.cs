using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Tag
{
    public class TagService: BaseService, ITagService
    {
        public TagService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<ServerResponse<List<TagResponse>>> GetTagsAsync()
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = _myHelperDbContext.Tags.Select(x => _mapper.Map<DAL.Entities.Tag, TagResponse>(x));

                return ServerResponseBuilder.Build(await query.ToListAsync());
            });
        }

        public async Task<ServerResponse<bool>> CreateTagAsync(TagRequest tagRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var tag = new DAL.Entities.Tag
                {
                    Name = tagRequest.Name
                };

                await _myHelperDbContext.Tags.AddAsync(tag);
                await _myHelperDbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
            }, tagRequest);
        }
    }
}
