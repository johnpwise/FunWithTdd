using Newtonsoft.Json;
using TDDPlayground.API.Interfaces;
using TDDPlayground.API.Models;

namespace TDDPlayground.API.Wrappers;

public class HttpClientWrapper : IHttpClientWrapper
{
    private readonly HttpClient _httpClient;

    public HttpClientWrapper()
    {
        _httpClient = new HttpClient();
    }

    public async Task<UserProfile> GetAsync(string url)
    {
        var response = await _httpClient.GetAsync(url);

        var userProfile = JsonConvert.DeserializeObject<UserProfile>(await response.Content.ReadAsStringAsync());

        return userProfile;
    }
}