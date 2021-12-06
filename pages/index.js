import Head from 'next/head';
import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Meetup App</title>
        <meta
          name='description'
          content='discover the best meetups places on earth'
        ></meta>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  const mongoURL = process.env.DB_URL;
  const client = await MongoClient.connect(mongoURL); // storing connection to database (mongo atlas) on const client
  const db = client.db(); // storing the db

  const meetupsCollection = db.collection('meetups'); // storing the collection of choice on const meetupsCollection

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

// get serverSideProps exemple

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       meetups: DUMMY_DATA,
//     },
//   };
// }

export default HomePage;
