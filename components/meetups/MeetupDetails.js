import classes from './MeetupDetails.module.css';

const MeetupDetails = (props) => {
  return (
    <section className={classes.content}>
      <img src={props.meetupData.image} alt={props.meetupData.title} />
      <h1>{props.meetupData.title}</h1>
      <address>{props.meetupData.address}</address>
      <p>{props.meetupData.description}</p>
    </section>
  );
};

export default MeetupDetails;
