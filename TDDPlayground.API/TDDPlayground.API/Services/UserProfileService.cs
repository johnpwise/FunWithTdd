using TDDPlayground.API.Interfaces;
using TDDPlayground.API.Models;

namespace TDDPlayground.API.Services;

public class UserProfileService : IUserProfileService
{
    private readonly IHttpClientWrapper _httpClientWrapper;

    public UserProfileService(IHttpClientWrapper httpClientWrapper)
    {
        _httpClientWrapper = httpClientWrapper;
    }

    public async Task<UserProfile> GetRandomUserProfileAsync()
    {
        var result = await _httpClientWrapper.GetAsync("https://randomuser.me/api/");
        
        return result;
    }
}