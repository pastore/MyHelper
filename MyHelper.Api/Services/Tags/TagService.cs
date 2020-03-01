using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Exceptions;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Tags;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Services.Tags
{
    public class TagService: BaseService, ITagService
    {
        public TagService(MyHelperContext myHelperDbContext, IMapper mapper) : base(myHelperDbContext, mapper) { }

        public async Task<ServerResponse<List<TagResponse>>> GetTagsAsync()
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = _myHelperDbContext.Tags.Select(x => _mapper.Map<Tag, TagResponse>(x));

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

        public async Task<ServerResponse<PageResult<TagAdminResponse>>> GetAdminTagsByPageAsync(AdminTableFilterRequest adminTableFilterRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var query = _myHelperDbContext.Tags.AsQueryable();

                query = FilterAdminTags(query, adminTableFilterRequest);

                var tagsCount = query.Count();

                query = SortItems(query, adminTableFilterRequest);

                query = FetchItems(query, adminTableFilterRequest);

                var pageResult = new PageResult<TagAdminResponse>
                {
                    Items = query.Select(x => new TagAdminResponse()
                        {
                            Id = x.Id,
                            Name = x.Name,
                            Notes = x.NoteTags.Select(y => y.Note.Name).ToArray(),
                            Tasks = x.MhTaskTags.Select(z => z.MhTask.Name).ToArray()
                        }).ToList(),
                    TotalCount = tagsCount
                };

                return ServerResponseBuilder.Build(await Task.FromResult(pageResult));
            });
        }

        public async Task<ServerResponse<bool>> UpdateTagAsync(TagRequest tagRequest)
        {
            return await BaseInvokeAsync(async () =>
            {
                var tag = await _myHelperDbContext.Tags.FirstOrDefaultAsync(x => x.Id == tagRequest.Id);

                if (tag == null)
                    throw new NotFoundException(Constants.Errors.TagNotExists);

                tag.Name = tagRequest.Name;
                _myHelperDbContext.Tags.Update(tag);

                await _myHelperDbContext.SaveChangesAsync();

                return ServerResponseBuilder.Build(true);
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

        #region -- Private methods --

        private IQueryable<Tag> FilterAdminTags(IQueryable<Tag> query, AdminTableFilterRequest adminTableFilterRequest)
        {
            if (!string.IsNullOrWhiteSpace(adminTableFilterRequest.Search))
            {
                query = query.Where(x => x.Name.ToLower().Contains(adminTableFilterRequest.Search.ToLower()));
            }

            return query;
        }

        #endregion
    }
}
