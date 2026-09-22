using System.Collections.Concurrent;
using UserProfile.Api.Models;

namespace UserProfile.Api.Repositories;

public interface IUserProfileRepository
{
    IEnumerable<UserProfileModel> GetAll();
    UserProfileModel? GetById(Guid id);
    UserProfileModel Add(UserProfileModel profile);
    bool Update(UserProfileModel profile);
    bool Delete(Guid id);
}

public class InMemoryUserProfileRepository : IUserProfileRepository
{
    private readonly ConcurrentDictionary<Guid, UserProfileModel> _profiles = new();

    public InMemoryUserProfileRepository()
    {
        var seed = new UserProfileModel
        {
            Id = Guid.NewGuid(),
            FirstName = "Somchai",
            LastName = "Jaidee",
            Email = "somchai.jaidee@example.com",
            PhoneNumber = "081-234-5678",
            Bio = "Software engineer who loves building web applications.",
            AvatarUrl = "https://i.pravatar.cc/150?img=12",
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };
        _profiles[seed.Id] = seed;
    }

    public IEnumerable<UserProfileModel> GetAll() => _profiles.Values.OrderBy(p => p.CreatedAt);

    public UserProfileModel? GetById(Guid id) => _profiles.GetValueOrDefault(id);

    public UserProfileModel Add(UserProfileModel profile)
    {
        _profiles[profile.Id] = profile;
        return profile;
    }

    public bool Update(UserProfileModel profile)
    {
        if (!_profiles.ContainsKey(profile.Id))
        {
            return false;
        }

        _profiles[profile.Id] = profile;
        return true;
    }

    public bool Delete(Guid id) => _profiles.TryRemove(id, out _);
}
