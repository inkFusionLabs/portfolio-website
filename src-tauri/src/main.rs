// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{CustomMenuItem, Menu, Submenu};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let file_menu = Submenu::new("File", Menu::new().add_item(quit).add_item(close));
    let menu = Menu::new().add_submenu(file_menu);

    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|_app| {
            // For now, we'll use a simpler approach with the existing OAuth flow
            // The custom protocol will be handled by the browser redirecting back to the app
            // We'll listen for URL changes in the frontend instead
            
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
} 