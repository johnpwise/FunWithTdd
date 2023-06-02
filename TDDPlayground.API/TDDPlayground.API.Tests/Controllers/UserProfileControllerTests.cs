namespace TDDPlayground.API.Tests.Controllers;

public class UserProfileControllerTests
{
    private readonly Mock<IUserProfileService> _mockUserProfileService;
    private readonly UserProfileController _sut;

    public UserProfileControllerTests()
    {
        _mockUserProfileService = new Mock<IUserProfileService>();
        _mockUserProfileService.Setup(x =>
            x.GetRandomUserProfileAsync());

        _sut = new UserProfileController(_mockUserProfileService.Object);
    }

    [Fact]
    public async Task GetRandomUserProfileAsync_ReturnsOkObjectResult()
    {
        // Act
        var result = await _sut.GetRandomUserProfileAsync();

        // Assert
        Assert.IsType<OkObjectResult>(result);
    }

    [Fact]
    public async Task GetRandomUserProfileAsync_CallsGetRandomUserProfileAsync_OnUserProfileService()
    {
        // Act
        await _sut.GetRandomUserProfileAsync();

        // Assert
        _mockUserProfileService.Verify(x => 
                       x.GetRandomUserProfileAsync(), Times.Once);
    }
}