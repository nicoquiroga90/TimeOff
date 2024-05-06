const ProfileCard = ({ imageSrc, name, role, testimonial }) => {
  return (
    <div>
      <img src={imageSrc} alt={name} />
      <div className="myCarousel">
        <h3>{name}</h3>
        <h4>{role}</h4>
        <p>{testimonial}</p>
      </div>
    </div>
  );
};

export default ProfileCard;