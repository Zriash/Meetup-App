import Head from 'next/head';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

const NewMeetupPage = () => {
  async function AddMeetupHandler(newMeetupData) {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(newMeetupData),
      headers: { 'content-type': 'application/json' },
    });
    const data = await response.json();
    if (!data) {
      console.log('something went wrong');
    }
  }

  return (
    <>
      <Head>
        <title>Add new meetup</title>
        <meta
          name='description'
          content='Add your own amazing meetup'
        ></meta>
      </Head>
      <NewMeetupForm onAddMeetup={AddMeetupHandler} />
    </>
  );
};

export default NewMeetupPage;
