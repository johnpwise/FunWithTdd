namespace TDDPlayground.API.Tests.Wrappers;

public class HttpClientWrapperTests
{
    [Fact]
    public async Task GetAsync_ReturnsUserProfile()
    {
        // Arrange
        var httpClientWrapper = new HttpClientWrapper();
        var url = "https://randomuser.me/api/";

        // Act
        var result = await httpClientWrapper.GetAsync(url);
        
        // Assert
        Assert.IsType<UserProfile>(result);
    }
}