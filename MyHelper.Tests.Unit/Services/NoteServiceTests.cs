using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Moq;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.Models.Request;
using MyHelper.Api.Services.Notes;
using MyHelper.Tests.Unit.Seed;
using NUnit.Framework;
using System;
using System.Collections.Generic;

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
        }

        [Test]
        public void GetNotesAsyncTest_NotesCreateDateFieldIsLaterThanFiltersFromDate_WorkProperly()
        {
            noteFilterRequest = new NoteFilterRequest()
            {
                FromDate = DateTime.Now.Date.AddDays(-1)
            };

            Assert.That(_noteService.GetNotesAsync(1, noteFilterRequest).Result.Result.Count, Is.EqualTo(3));
        }

        [Test]
        public void GetNotesAsyncTest_FiltersToDateFieldIsLaterThanNotesCreateDate_WorkProperly()
        {
            noteFilterRequest = new NoteFilterRequest()
            {
                ToDate = DateTime.Now.Date.AddDays(1)
            };

            Assert.That(_noteService.GetNotesAsync(1, noteFilterRequest).Result.Result.Count, Is.EqualTo(3));
        }

        [Test]
        public void GetNotesAsyncTest_FiltersSearchFieldEqualsToNotesName_WorkProperly()
        {
            noteFilterRequest = new NoteFilterRequest()
            {
                Search = "note_name1"
            };

            Assert.That(_noteService.GetNotesAsync(1, noteFilterRequest).Result.Result.Count, Is.EqualTo(1));
        }

        [Test]
        public void GetNotesAsyncTest_FiltersTagIdsFieldEqualsToNotesTagsIds_WorkProperly()
        {
            noteFilterRequest = new NoteFilterRequest();
            (noteFilterRequest.TagIds as List<long>).AddRange(new long[] { 1, 2, 3 }); 

            Assert.That(_noteService.GetNotesAsync(1, noteFilterRequest).Result.Result.Count, Is.EqualTo(3));
        }
    }
}
