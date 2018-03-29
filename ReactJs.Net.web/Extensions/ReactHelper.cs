using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

namespace ReactJs.Net.web.Extensions
{
    public static class ReactHelper
    {/// <summary>
    /// Helper to render a React.JS component
    /// </summary>
    /// <param name="helper"></param>
    /// <param name="componentName">Name of the React component</param>
    /// <param name="containerId">Id of the container element where you want to render this component to</param>
    /// <param name="props">Props for the react component</param>
    /// <param name="refName">The variable name to store your rendered react component. Format - [JsAppName].[PropertyToStoreComponent]</param>
    /// <returns></returns>
        public static IHtmlContent RenderReactComponent(this IHtmlHelper helper, string componentName, string containerId, object props, string refName = null)
        {
            string retVal;
            if (props != null)
            {
                var jsonProps = JsonConvert.SerializeObject(props);
                retVal = $"ReactDOM.render(React.createElement({componentName}, {jsonProps}), document.getElementById('{containerId}'));";
            }
            else
            {
                retVal = $"ReactDOM.render(React.createElement({componentName}, {{}}), document.getElementById('{containerId}'));";
            }

            if (!string.IsNullOrWhiteSpace(refName))
            {
                retVal = $"{refName}={retVal}";
            }

            return new HtmlString($"<script>{retVal}</script>");
        }
    }
}