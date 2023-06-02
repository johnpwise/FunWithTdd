using TDDPlayground.API.Models;

namespace TDDPlayground.API.Interfaces;

public interface IUserProfileService
{
    Task<UserProfile> GetRandomUserProfileAsync();
}