namespace TDDPlayground.API.Tests.Services;

public class UserProfileServiceTests
{
    private readonly Mock<IHttpClientWrapper> _mockHttpClientWrapper;
    private readonly UserProfileService _sut;

    public UserProfileServiceTests()
    {
        _mockHttpClientWrapper = new Mock<IHttpClientWrapper>();

        const string expectedUrl = "https://randomuser.me/api/";
        
        _mockHttpClientWrapper.Setup(x =>
                x.GetAsync(expectedUrl))
            .ReturnsAsync(new UserProfile());

        _sut = new UserProfileService(_mockHttpClientWrapper.Object);
    }

    [Fact]
    public async Task GetRandomUserProfileAsync_CallCorrectApiEndpoint()
    {
        // Arrange
        const string expected = "https://randomuser.me/api/";

        // Act
        await _sut.GetRandomUserProfileAsync();

        // Assert
        _mockHttpClientWrapper.Verify(x => x.GetAsync(expected), Times.Once);
    }

    [Fact]
    public async Task GetRandomUserProfileAsync_ReturnsUserProfileData()
    {
        // Arrange
        // Act
        var result = await _sut.GetRandomUserProfileAsync();

        // Assert
        Assert.IsType<UserProfile>(result);
    }
}