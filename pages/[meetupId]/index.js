import Head from 'next/head';
import MeetupDetails from '../../components/meetups/MeetupDetails';
import { MongoClient, ObjectId } from 'mongodb';

const MeetupDetailsPage = (props) => {
  return (
    <>
      <Head>
        <title>Meetup App - {props.meetupData.title}</title>
        <meta
          name='description'
          content={`View the ${props.meetupData.title} on Meetup App`}
        ></meta>
      </Head>
      <MeetupDetails meetupData={props.meetupData} />
    </>
  );
};

export async function getStaticPaths() {
  const mongoURL = process.env.DB_URL;
  const client = await MongoClient.connect(mongoURL); // storing connection to database (mongo atlas) on const client
  const db = client.db(); // storing the db

  const meetupsCollection = db.collection('meetups'); // storing the collection of choice on const meetupsCollection

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray(); // find all the meetups from db and extract only id

  client.close();

  return {
    fallback: 'blocking',
    paths: meetups.map((meetup) => ({
      params: {
        meetupId: meetup._id.toString(),
      },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const mongoURL = process.env.DB_URL;

  const client = await MongoClient.connect(mongoURL); // storing connection to database (mongo atlas) on const client
  const db = client.db(); // storing the db

  const meetupsCollection = db.collection('meetups'); // storing the collection of choice on const meetupsCollection

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId),
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetailsPage;
