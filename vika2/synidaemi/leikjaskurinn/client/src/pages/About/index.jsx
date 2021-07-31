import TextContent from '../../components/TextContent';
import Button from '../../components/Button';
import styles from './style.module.css';
import { useHistory } from 'react-router';

const About = () => {
    const history = useHistory();
    return (
        <div className={styles.container}>
            <TextContent
                heading="The beginning"
                text="Leikjaskúrinn is a retro game shop that has had years of experience in the game shop industry. It
                    all started one summer when an idea popped up to start selling old games in our garage. At first it
                    seemed quite strange for people to drop by the owner's house to see the inventory but later on the
                    business started growing and the garage simply wasn't big enough. That's when we went ahead and
                    built the store you know today. It's been 4 years since we said goodbye to that garage and we
                    haven't looked back since."
            />
            <TextContent
                heading="The company's slogan"
                text="We want our customers to feel like kids again and rediscover that magical feeling that games bring to the table.
                It's such a great feeling knowing that we are bringing our customers great value and we'd like to keep on giving. So if there
                is anything you'd like to share with us that could help us on our journey to bringing retro games to life we'd love to hear it."
            />
            <Button style={{ float: 'right', alignSelf: 'flex-end' }} onClick={() => history.push('/contact')}>
                Contact us
            </Button>
        </div>
    );
};

export default About;
