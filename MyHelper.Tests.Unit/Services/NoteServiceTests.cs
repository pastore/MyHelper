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

        [SetUp]
        public void SetUp()
        {
            var dbOptions = new DbContextOptionsBuilder<MyHelperContext>().UseInMemoryDatabase(databaseName: "TestDb").Options;
            var myHelperDbContextt = new MyHelperContext(dbOptions);
            new UnitTestDbSeeder(myHelperDbContextt).SeedDb();
            _noteService = new NoteService(myHelperDbContextt, new Mock<IMapper>().Object);
        }

        [Test]
        public void GetNotesAsyncTest()
        {

        }

    }
}
