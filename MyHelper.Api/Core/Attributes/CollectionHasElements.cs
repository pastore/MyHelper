using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

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
