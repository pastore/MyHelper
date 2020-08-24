using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MyHelper.Api.Core;
using MyHelper.Api.Core.Exceptions;
using MyHelper.Api.Core.Extensions;
using MyHelper.Api.Models.Messanging;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using ValidationContext = System.ComponentModel.DataAnnotations.ValidationContext;

namespace MyHelper.Api.Services
{
    public abstract class BaseService<TDbContext> where TDbContext : DbContext
    {
        protected readonly TDbContext DbContext;
        protected readonly IMapper Mapper;

        protected BaseService(TDbContext dbContext, IMapper mapper)
        {
            DbContext = dbContext;
            Mapper = mapper;
        }

        protected async Task<ServerResponse<TReturn>> BaseInvokeAsync<TReturn>(Func<Task<ServerResponse<TReturn>>> func,
            object request = null)
        {
            if (request != null) CheckModel(request);

            return await func();
        }

        protected async Task<ServerResponse<TReturn>> BaseInvokeWithTryCatchAsync<TReturn>(
            Func<Task<ServerResponse<TReturn>>> func, object request = null)
        {
            try
            {
                if (request != null) CheckModel(request);

                return await func();
            }
            catch
            {
                return new ServerResponse<TReturn>();
            }
        }

        protected IQueryable<T> FetchItems<T, TFr>(IQueryable<T> query, TFr fetchRequest)
            where TFr : IFetchRequest
        {
            if (fetchRequest.Offset.HasValue)
            {
                query = query.Skip(fetchRequest.Offset.Value);
            }

            if (fetchRequest.Limit.HasValue)
            {
                query = query.Take(fetchRequest.Limit.Value);
            }

            return query;
        }

        protected IQueryable<T> SortItems<T, TFr>(IQueryable<T> query, TFr sortRequest)
            where TFr : ISortRequest
        {
            var type = typeof(T);
            var prop = type.GetProperty(sortRequest.SortColumn);
            var param = Expression.Parameter(type);

            if (prop != null)
            {
                var expr = Expression.Lambda<Func<T, object>>(
                    Expression.Convert(Expression.Property(param, prop), typeof(object)),
                    param
                );

                var sortingDictionary = new Dictionary<string, IQueryable<T>>
                {
                    {SortDirection.Asc.GetName().ToLower(), query.OrderBy(expr)},
                    {SortDirection.Desc.GetName().ToLower(), query.OrderByDescending(expr)}
                };

                return sortingDictionary[sortRequest.SortDirection];
            }

            return query;
        }

        public FeedMessage CreateFeedMessage<T>(T request, EFeedAction feedAction)
        {
            var feedMessage = Mapper.Map<T, FeedMessage>(request);
            feedMessage.FeedAction = feedAction;

            return feedMessage;
        }

        private void CheckModel(object request)
        {
            var validationResultList = new List<ValidationResult>();

            if (!Validator.TryValidateObject(request, new ValidationContext(request), validationResultList, true))
            {
                throw new BadRequestException();
            }
        }
    }
}