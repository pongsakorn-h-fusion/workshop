using System.ComponentModel.DataAnnotations;

namespace UserProfile.Api.Dtos;

public record UserProfileDto(
    Guid Id,
    string FirstName,
    string LastName,
    string Email,
    string PhoneNumber,
    string Bio,
    string AvatarUrl,
    DateTime CreatedAt,
    DateTime UpdatedAt);

public class UpsertUserProfileRequest
{
    [Required, StringLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [Required, StringLength(50)]
    public string LastName { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    [StringLength(20)]
    public string PhoneNumber { get; set; } = string.Empty;

    [StringLength(500)]
    public string Bio { get; set; } = string.Empty;

    [StringLength(300)]
    public string AvatarUrl { get; set; } = string.Empty;
}
