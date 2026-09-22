using Microsoft.AspNetCore.Mvc;
using UserProfile.Api.Dtos;
using UserProfile.Api.Models;
using UserProfile.Api.Repositories;

namespace UserProfile.Api.Controllers;

[ApiController]
[Route("api/user-profiles")]
public class UserProfilesController : ControllerBase
{
    private readonly IUserProfileRepository _repository;

    public UserProfilesController(IUserProfileRepository repository)
    {
        _repository = repository;
    }

    [HttpGet]
    public ActionResult<IEnumerable<UserProfileDto>> GetAll()
    {
        var profiles = _repository.GetAll().Select(ToDto);
        return Ok(profiles);
    }

    [HttpGet("{id:guid}")]
    public ActionResult<UserProfileDto> GetById(Guid id)
    {
        var profile = _repository.GetById(id);
        if (profile is null)
        {
            return NotFound();
        }

        return Ok(ToDto(profile));
    }

    [HttpPost]
    public ActionResult<UserProfileDto> Create([FromBody] UpsertUserProfileRequest request)
    {
        var now = DateTime.UtcNow;
        var profile = new UserProfileModel
        {
            Id = Guid.NewGuid(),
            FirstName = request.FirstName,
            LastName = request.LastName,
            Email = request.Email,
            PhoneNumber = request.PhoneNumber,
            Bio = request.Bio,
            AvatarUrl = request.AvatarUrl,
            CreatedAt = now,
            UpdatedAt = now
        };

        _repository.Add(profile);
        return CreatedAtAction(nameof(GetById), new { id = profile.Id }, ToDto(profile));
    }

    [HttpPut("{id:guid}")]
    public IActionResult Update(Guid id, [FromBody] UpsertUserProfileRequest request)
    {
        var existing = _repository.GetById(id);
        if (existing is null)
        {
            return NotFound();
        }

        existing.FirstName = request.FirstName;
        existing.LastName = request.LastName;
        existing.Email = request.Email;
        existing.PhoneNumber = request.PhoneNumber;
        existing.Bio = request.Bio;
        existing.AvatarUrl = request.AvatarUrl;
        existing.UpdatedAt = DateTime.UtcNow;

        _repository.Update(existing);
        return Ok(ToDto(existing));
    }

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        return _repository.Delete(id) ? NoContent() : NotFound();
    }

    private static UserProfileDto ToDto(UserProfileModel model) => new(
        model.Id,
        model.FirstName,
        model.LastName,
        model.Email,
        model.PhoneNumber,
        model.Bio,
        model.AvatarUrl,
        model.CreatedAt,
        model.UpdatedAt);
}
