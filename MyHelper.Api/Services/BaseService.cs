using AutoMapper;
using MyHelper.Api.Core.Exceptions;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using ValidationContext = System.ComponentModel.DataAnnotations.ValidationContext;

namespace MyHelper.Api.Services
{
    public abstract class BaseService
    {
        protected readonly MyHelperContext _myHelperDbContext;
        protected readonly IMapper _mapper;

        protected BaseService(MyHelperContext myHelperDbContext, IMapper mapper)
        {
            _myHelperDbContext = myHelperDbContext;
            _mapper = mapper;
        }

        protected async Task<ServerResponse<TReturn>>  BaseInvokeAsync<TReturn>(Func<Task<ServerResponse<TReturn>>> func, object request = null)
        {
            if (request != null) CheckModel(request);

            return await func();
        }

        protected IQueryable<T> FetchItems<T, TFr>(IQueryable<T> query, TFr fetchRequest) 
            where TFr: IFetchRequest
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
