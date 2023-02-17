import './bio.css';

export const Bio = () => {
    return(
        <div className='bio'>
            <img className='profilePic' alt='profile' src={require('../../media/profile.jpg')}/>
            <div className='profileText'>
                <h2>About me</h2>
                <p>A biography, or simply bio, is a detailed description of a person's life. It involves more than just the basic facts like education, work, relationships, and death; it portrays a person's experience of these life events. Unlike a profile or curriculum vitae (résumé), a biography presents a subject's life story, highlighting various aspects of their life, including intimate details of experience, and may include an analysis of the subject's personality.</p>
            </div>
        </div>
    )
}