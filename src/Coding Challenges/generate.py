# get argument 1 and print it
import sys


def main():
    foldername = sys.argv[1]

    import os
    os.mkdir(foldername)
    os.chdir(foldername)

    with open("index.html", "w") as f:
        f.write('<!DOCTYPE html>\n<html style="height: 100%">\n<body style="height: 100%;display:flex;align-items:center;justify-content:center;margin:0;overflow:hidden;">\n<script\nsrc="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.4.2/p5.min.js"\nintegrity="sha512-rCZdHNB0AePry6kAnKAVFMRfWPmUXSo+/vlGtrOUvhsxD0Punm/xWbEh+8vppPIOzKB9xnk42yCRZ5MD/jvvjQ=="\ncrossorigin="anonymous"\nreferrerpolicy="no-referrer"\n></script>\n<script src="./main.js"></script>\n</body>\n</html>')
    with open("main.js", "w") as f:
        f.write(
            'function setup() {\ncreateCanvas(800, 800);\n}\nfunction draw() {\nbackground(0);\n}')

        # run "code ./main,js" in the terminal
        os.system("code ./main.js")


if __name__ == '__main__':
    main()
