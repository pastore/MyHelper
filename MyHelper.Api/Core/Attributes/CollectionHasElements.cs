using System.Collections;
using System.ComponentModel.DataAnnotations;

namespace MyHelper.Api.Core.Attributes
{
    public class CollectionHasElements: ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            var collection = (ICollection)value;

            return collection?.Count > 0;
        }
    }
}
