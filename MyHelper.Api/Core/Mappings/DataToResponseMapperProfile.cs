using AutoMapper;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Feeds;
using MyHelper.Api.Models.Friends;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Notes;
using MyHelper.Api.Models.Tags;
using MyHelper.Api.Models.Tasks;
using MyHelper.Api.Models.Users;
using Newtonsoft.Json;
using System.Linq;

namespace MyHelper.Api.Core.Mappings
{
    public class DataToResponseMapperProfile : Profile
    {
        public DataToResponseMapperProfile() : base("DataToResponse")
        {
            CreateMap<AppUser, AppUserViewModel>();
            CreateMap<AppUser, FriendViewModel>();

            CreateMap<FeedMessage, Feed>();
            CreateMap<Feed, FeedResponse>()
                .ForMember(x => x.AppUserViewModel,x => x.MapFrom(q => JsonConvert.DeserializeObject<AppUserViewModel>(q.AppUserData)))
                .ForMember(x => x.FeedData, x => x.ResolveUsing<BaseFeedData>(src =>
                {
                    switch (src.FeedType)
                    {
                        case EFeedType.CreateNote:
                            return JsonConvert.DeserializeObject<NoteFeedData>(src.FeedData);
                        case EFeedType.CreateMhTask:
                            return JsonConvert.DeserializeObject<MhTaskFeedData>(src.FeedData);
                        default:
                            return null;
                    }
                }));

            CreateMap<TagAdmin, TagAdminResponse>();
            CreateMap<Tag, TagResponse>();

            CreateMap<ScheduleMhTask, ScheduleMhTaskViewModel>();

            CreateMap<MhTask, MhTaskResponse>()
                .ForMember(x => x.Tags, x => x.MapFrom(q => q.MhTaskTags.Select(r => r.Tag)))
                .ForMember(x => x.ScheduleMhTaskViewModel, x => x.MapFrom(q => q.ScheduleMhTask));

            CreateMap<Note, NoteResponse>()
                .ForMember(x => x.Tags, x => x.MapFrom(q => q.NoteTags.Select(r => r.Tag)));
        }
    }
}
