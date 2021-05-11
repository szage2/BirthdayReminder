import inotify.adapters
import git
import docker

def _main():
    i = inotify.adapters.Inotify()
    i.add_watch('/home/pi/requests_birthday_reminder.json')

    while (True):
        try:
            for event in i.event_gen(yield_nones=False):
                (_, type_names, path, filename) = event

                repo = git.Repo("/home/pi/BirthdayReminder")
                o = repo.remotes.origin
                o.pull()

                dockerclient = docker.from_env()
                try:
                    oldbirthdayreminder = dockerclient.containers.get("birthdayreminder")
                except:
                    pass
                if ('oldbirthdayreminder' in locals()):
                    oldbirthdayreminder.stop()
                    oldbirthdayreminder.remove()
                dockerclient.images.build(path="/home/pi/BirthdayReminder",tag="birthdayreminder")
                dockerclient.containers.run(image="birthdayreminder", detach=True, ports={"8081":"8081"}, name="birthdayreminder", restart_policy={"Name": "always"})
                dockerclient.containers.prune()
        except Exception as e:
            print(e)
            pass

if __name__ == '__main__':
    _main()
