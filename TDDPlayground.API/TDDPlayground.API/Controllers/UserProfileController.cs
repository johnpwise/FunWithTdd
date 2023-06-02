using Microsoft.AspNetCore.Mvc;
using TDDPlayground.API.Interfaces;

namespace TDDPlayground.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private readonly IUserProfileService _userProfileService;

    public UserProfileController(IUserProfileService userProfileService)
    {
        _userProfileService = userProfileService;
    }

    public async Task<IActionResult> GetRandomUserProfileAsync()
    {
        var result = await _userProfileService.GetRandomUserProfileAsync();

        return Ok(await Task.FromResult(result));
    }
}