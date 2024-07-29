import os

def export_code(base_dir, output_file):
    paths_to_include = [
        'components',
        'db',
        'App.js',
        'index.js',
        'context/AuthContext.js'  # Include AuthContext.js explicitly
    ]
    
    with open(output_file, 'w', encoding='utf-8') as out_file:
        for path in paths_to_include:
            full_path = os.path.join(base_dir, path)
            if os.path.isdir(full_path):
                for root, _, files in os.walk(full_path):
                    for file in files:
                        if file.endswith('.js') or file.endswith('.css'):
                            file_path = os.path.join(root, file)
                            out_file.write(f'// Start of {file_path}\n')
                            with open(file_path, 'r', encoding='utf-8') as f:
                                out_file.write(f.read())
                            out_file.write(f'\n// End of {file_path}\n\n')
            elif os.path.isfile(full_path):
                if full_path.endswith('.js') or full_path.endswith('.css'):
                    out_file.write(f'// Start of {full_path}\n')
                    with open(full_path, 'r', encoding='utf-8') as f:
                        out_file.write(f.read())
                    out_file.write(f'\n// End of {full_path}\n\n')
                else:
                    print(f"Skipping {full_path} as it is not a .js or .css file.")
            else:
                print(f"Path {full_path} does not exist.")

# Example usage
base_dir = r'C:\Users\info\OneDrive\Escritorio\JENN\Pagina Jen\jencafe\src'
output_file = 'exported_code.txt'
export_code(base_dir, output_file)
