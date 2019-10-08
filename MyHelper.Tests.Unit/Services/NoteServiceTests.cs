using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Moq;
using MyHelper.Api.DAL.Context;
using MyHelper.Api.Services.Notes;
using MyHelper.Tests.Unit.Seed;
using NUnit.Framework;

namespace MyHelper.Tests.Unit.Services
{
    [TestFixture]
    public class NoteServiceTests
    {
        private INoteService _noteService;
        private MyHelperContext _myHelperDbContext;

        [SetUp]
        public void SetUp()
        {
            var dbOptions = new DbContextOptionsBuilder<MyHelperContext>().UseInMemoryDatabase(databaseName: "TestDb").Options;
            _myHelperDbContext = new MyHelperContext(dbOptions);
            new UnitTestDbSeeder(_myHelperDbContext).SeedDb();
            _noteService = new NoteService(_myHelperDbContext, new Mock<IMapper>().Object);
        }

        [Test]
        public void GetNotesAsyncTest()
        {
            var users = _myHelperDbContext.AppUsers;
            var notes = _myHelperDbContext.Notes;
            var noteTags = _myHelperDbContext.NoteTags;
            var tags = _myHelperDbContext.Tags;
        }
    }
}
