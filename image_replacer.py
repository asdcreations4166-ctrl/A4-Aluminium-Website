import os
import fileinput

def replace_images(html_file, image_map):
    with fileinput.FileInput(html_file, inplace=True) as file:
        for line in file:
            for old_image, new_image in image_map.items():
                line = line.replace(old_image, new_image)
            print(line, end='')

def main():
    image_map = {
        'placeholder-product1.jpg': '',
        'placeholder-product2.jpg': '',
        'placeholder-product3.jpg': '',
        'placeholder-work1.jpg': '',
        'placeholder-work2.jpg': '',
        'placeholder-work3.jpg': '',
    }

    for old_image in image_map.keys():
        new_image = input(f"Enter the path for {old_image}: ")
        image_map[old_image] = new_image

    html_files = [f for f in os.listdir('.') if f.endswith('.html')]

    for html_file in html_files:
        replace_images(html_file, image_map)
        print(f"Updated {html_file}")

if __name__ == '__main__':
    main()
