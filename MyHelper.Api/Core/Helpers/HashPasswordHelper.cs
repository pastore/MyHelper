using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CryptoHelper;

namespace MyHelper.Api.Core.Helpers
{
    public class HashPasswordHelper
    {
        public static string Hash(string password)
        {
            return Crypto.HashPassword(password);
        }

        public static bool Verify(string password, string hash)
        {
            return Crypto.VerifyHashedPassword(hash, password);
        }
    }
}
