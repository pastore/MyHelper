using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Models.Response;
using ValidationContext = System.ComponentModel.DataAnnotations.ValidationContext;

namespace MyHelper.Api.Services
{
    public abstract class BaseService
    {
        protected readonly MyHelperContext _myHelperDbContext;
        protected readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of the class.
        /// </summary>
        /// <param name="myHelperDbContext">Db context.</param>
        protected BaseService(MyHelperContext myHelperDbContext, IMapper mapper)
        {
            _myHelperDbContext = myHelperDbContext;
            _mapper = mapper;
        }

        /// <summary>
        /// Bases the invoke.
        /// </summary>
        /// <returns>The invoke.</returns>
        /// <param name="func">Func.</param>
        /// <param name="request">Request.</param>
        protected AOResult BaseInvoke(Func<AOResult> func, object request = null)
        {
            try
            {
                if (request != null)
                {
                    AOResult checkModelResult = CheckModel(request);
                    if (!checkModelResult.IsSuccess)
                        return checkModelResult;
                }

                return func();
            }
            catch (Exception ex)
            {
                return AOBuilder.SetError(ex.Message);
            }
        }

        /// <summary>
        /// Bases the invoke.
        /// </summary>
        /// <returns>The invoke.</returns>
        /// <param name="func">Func.</param>
        /// <param name="request">Request.</param>
        /// <typeparam name="TReturn">The 1st type parameter.</typeparam>
        protected AOResult<TReturn> BaseInvoke<TReturn>(Func<AOResult<TReturn>> func, object request = null)
        {
            try
            {
                if (request != null)
                {
                    AOResult<TReturn> checkModelResult = CheckModel<TReturn>(request);
                    if (!checkModelResult.IsSuccess)
                        return checkModelResult;
                }

                return func();
            }
            catch (Exception ex)
            {
                return AOBuilder.SetError<TReturn>(ex.Message);
            }
        }

        /// <summary>
        /// Bases the invoke.
        /// </summary>
        /// <returns>The invoke.</returns>
        /// <param name="func">Func.</param>
        /// <param name="request">Request.</param>
        protected async Task<AOResult> BaseInvoke(Func<Task<AOResult>> func, object request = null)
        {
            try
            {
                if (request != null)
                {
                    AOResult checkModelResult = CheckModel(request);
                    if (!checkModelResult.IsSuccess)
                        return checkModelResult;
                }

                return await func();
            }
            catch (Exception ex)
            {
                return AOBuilder.SetError(ex.Message);
            }
        }

        /// <summary>
        /// Bases the invoke async.
        /// </summary>
        /// <returns>The invoke async.</returns>
        /// <param name="func">Func.</param>
        /// <param name="request">Request.</param>
        protected async Task<AOResult> BaseInvokeAsync(Func<Task<AOResult>> func, object request = null)
        {
            try
            {
                if (request != null)
                {
                    AOResult checkModelResult = CheckModel(request);
                    if (!checkModelResult.IsSuccess)
                        return checkModelResult;
                }

                return await func();
            }
            catch (Exception ex)
            {
                return AOBuilder.SetError(ex.Message);
            }
        }

        /// <summary>
        /// Bases the invoke async.
        /// </summary>
        /// <returns>The invoke async.</returns>
        /// <param name="func">Func.</param>
        /// <param name="request">Request.</param>
        /// <typeparam name="TReturn">The 1st type parameter.</typeparam>
        protected async Task<AOResult<TReturn>>  BaseInvokeAsync<TReturn>(Func<Task<AOResult<TReturn>>> func, object request = null)
        {
            try
            {
                if (request != null)
                {
                    AOResult<TReturn> checkModelResult = CheckModel<TReturn>(request);
                    if (!checkModelResult.IsSuccess)
                        return checkModelResult;
                }

                return await func();
            }
            catch (Exception ex)
            {
                return AOBuilder.SetError<TReturn>(ex.Message);
            }
        }

        /// <summary>
        /// Bases the invoke.
        /// </summary>
        /// <returns>The invoke.</returns>
        /// <param name="func">Func.</param>
        /// <param name="request">Request.</param>
        /// <typeparam name="TReturn">The 1st type parameter.</typeparam>
        protected AOResult<TReturn> BaseInvokeWithTransaction<TReturn>(Func<AOResult<TReturn>> func, object request = null)
        {
            using (var transaction = _myHelperDbContext.Database.BeginTransaction())
            {
                try
                {
                    if (request != null)
                    {
                        AOResult<TReturn> checkModelResult = CheckModel<TReturn>(request);
                        if (!checkModelResult.IsSuccess)
                            return checkModelResult;
                    }

                    AOResult<TReturn> result = func();
                    transaction.Commit();

                    return result;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return AOBuilder.SetError<TReturn>(ex.Message);
                }
            }
        }

        /// <summary>
        /// Bases the invoke.
        /// </summary>
        /// <returns>The invoke.</returns>
        /// <param name="func">Func.</param>
        /// <param name="request">Request.</param>
        /// <typeparam name="TReturn">The 1st type parameter.</typeparam>
        protected AOResult<TReturn> BaseInvokeWithTransactionPassModel<TReturn>(Func<AOResult<TReturn>, AOResult<TReturn>> func, object request)
        {
            using (var transaction = _myHelperDbContext.Database.BeginTransaction())
            {
                try
                {
                    AOResult<TReturn> result = func(CheckModel<TReturn>(request));
                    transaction.Commit();

                    return result;
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    return AOBuilder.SetError<TReturn>(ex.Message);
                }
            }
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

        #region -- Private helpers --

        private AOResult CheckModel(object request)
        {
            var validationResultList = new List<ValidationResult>();

            if (Validator.TryValidateObject(request, new ValidationContext(request), validationResultList, true))
            {
                return AOBuilder.SetSuccess();
            }
            return AOBuilder.SetError(null, "Model is not valid", validationResultList.Select(x => (x.MemberNames.FirstOrDefault(), x.ErrorMessage)));
        }

        private AOResult<T> CheckModel<T>(object request)
        {
            var validationResultList = new List<ValidationResult>();

            if (Validator.TryValidateObject(request, new ValidationContext(request), validationResultList, true))
            {
                return AOBuilder.SetSuccess<T>();
            }
            return AOBuilder.SetError<T>(null, "Model is not valid", validationResultList.Select(x => (x.MemberNames.FirstOrDefault(), x.ErrorMessage)));
        }

        #endregion
    }
}
