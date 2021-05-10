import inotify.adapters
import python-git
import docker

def _main():
    i = inotify.adapters.Inotify()

    i.add_watch('/home/pi/requests_birthday_reminder.json')

    for event in i.event_gen(yield_nones=False):
        (_, type_names, path, filename) = event

        repo = git.Repo("/home/pi/BirthdayReminder")
        o = repo.remotes.origin
        o.pull()
        dockerClient = docker.from_env()
        birthdayReminderImage = dockerClient.images.build("/home/pi/BirthdayReminder",tag="birthdayreminder")
        dockerClient.containers.run(birthdayReminderImage, detach=True, port="8081:8081", name="birthdayreminder")

if __name__ == '__main__':
    _main()
