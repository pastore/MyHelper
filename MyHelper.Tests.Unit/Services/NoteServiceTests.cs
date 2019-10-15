using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Moq;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Services.Notes;
using MyHelper.Tests.Unit.Seed;
using NUnit.Framework;
using System;

namespace MyHelper.Tests.Unit.Services
{
    [TestFixture]
    public class NoteServiceTests
    {
        private INoteService _noteService;
        private MyHelperContext _myHelperDbContext;
        private NoteFilterRequest noteFilterRequest;

        [SetUp]
        public void SetUp()
        {
            var dbOptions = new DbContextOptionsBuilder<MyHelperContext>().UseInMemoryDatabase(databaseName: "TestDb").Options;
            _myHelperDbContext = new MyHelperContext(dbOptions);
            new UnitTestDbSeeder(_myHelperDbContext).SeedDb();
            _noteService = new NoteService(_myHelperDbContext, new Mock<IMapper>().Object);
            noteFilterRequest = new NoteFilterRequest()
            {
                FromDate = DateTime.Now.Date.AddDays(-1)
            };
        }

        [Test]
        public void GetNotesAsyncTest()
        {
           Assert.That(_noteService.GetNotesAsync(1, noteFilterRequest).Result.Result.Count, Is.EqualTo(3));
        }
    }
}
