using TDDPlayground.API.Models;

namespace TDDPlayground.API.Interfaces;

public interface IHttpClientWrapper
{
    Task<UserProfile> GetAsync(string url);
}