using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyHelper.Api.DAL.Entities;
using MyHelper.Api.Models.Friend;
using MyHelper.Api.Models.Response;
using MyHelper.Api.Models.Tag;
using MyHelper.Api.Models.Task;
using MyHelper.Api.Models.User;

namespace MyHelper.Api.Core.Mappings
{
    public class DataToResponseMapperProfile : Profile
    {
        public DataToResponseMapperProfile() : base("DataToResponse")
        {
            CreateMap<AppUser, AppUserViewModel>();
            CreateMap<AppUser, FriendViewModel>();

            CreateMap<Tag, TagViewModel>();

            CreateMap<ScheduleMhTask, ScheduleMhTaskViewModel>();

            CreateMap<MhTask, MhTaskResponse>()
                .ForMember(x => x.Tags, x => x.MapFrom(q => q.MhTaskTags.Select(r => r.Tag)))
                .ForMember(x => x.ScheduleMhTaskViewModel, x => x.MapFrom(q => q.ScheduleMhTask));

            CreateMap<Note, NoteResponse>()
                .ForMember(x => x.Tags, x => x.MapFrom(q => q.NoteTags.Select(r => r.Tag)));
        }
    }
}
