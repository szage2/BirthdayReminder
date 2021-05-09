import inotify.adapters
import git

def _main():
    i = inotify.adapters.Inotify()

    i.add_watch('/home/pi/requests.json')

    for event in i.event_gen(yield_nones=False):
        (_, type_names, path, filename) = event

        repo = git.Repo("/home/pi/hs")
        o = repo.remotes.origin
        o.pull()

if __name__ == '__main__':
    _main()