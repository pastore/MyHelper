using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyHelper.Api.Core.Extensions
{
    public static class EnumExtensions
    {
        public static Dictionary<int, string> ToDictionary(this Enum @enum)
        {
            var type = @enum.GetType();
            return Enum.GetValues(type).Cast<int>().ToDictionary(e => e, e => Enum.GetName(type, e));
        }

        public static string GetName(this Enum val)
        {
            return Enum.GetName(val.GetType(), val);
        }

        public static TEnum GetEnumValue<TEnum>(this string enumStr) where TEnum : struct
        {
            var ret = default(TEnum);
            if (Enum.TryParse<TEnum>(enumStr, out ret))
                return ret;

            return ret;
        }
    }
}
