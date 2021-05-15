import inotify.adapters
import git
import docker

LOCALPATH = "/home/pi/BirthdayReminder"

def _main():
    i = inotify.adapters.Inotify()
    i.add_watch('/home/pi/requests_birthday_reminder.json')
    for event in i.event_gen(yield_nones=False):
        (_, type_names, path, filename) = event

        repo = git.Repo(LOCALPATH)
        o = repo.remotes.origin
        o.pull()

        dockerclient = docker.from_env()

        try:
            oldbirthdayreminder = dockerclient.containers.get("birthdayreminder")
            oldbirthdayreminder.stop()
            oldbirthdayreminder.remove()
            dockerclient.images.build(path=LOCALPATH,tag="birthdayreminder")
            dockerclient.containers.run(image="birthdayreminder", detach=True, ports={"8081":"8081","9229":"9229"}, name="birthdayreminder", restart_policy={"Name": "always"})
            dockerclient.containers.prune()
        except docker.errors.NotFound:
            dockerclient.images.build(path=LOCALPATH,tag="birthdayreminder")
            dockerclient.containers.run(image="birthdayreminder", detach=True, ports={"8081":"8081","9229":"9229"}, name="birthdayreminder", restart_policy={"Name": "always"})
            dockerclient.containers.prune()

if __name__ == '__main__':
    _main()
