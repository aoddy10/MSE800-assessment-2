import os
import json
from django.core.management.base import BaseCommand
from django.core import serializers

class Command(BaseCommand):
    help = "Load seed data from JSON files in /api/seeds/"

    def handle(self, *args, **kwargs):
        seed_path = "/app/seeds/"  # ตำแหน่งไฟล์ใน Docker Container

        if not os.path.exists(seed_path):
            self.stdout.write(self.style.ERROR(f"Seed folder {seed_path} not found."))
            return

        for filename in os.listdir(seed_path):
            if filename.endswith(".json"):
                file_path = os.path.join(seed_path, filename)
                try:
                    with open(file_path, "r") as file:
                        data = file.read()
                        objects = serializers.deserialize("json", data)
                        for obj in objects:
                            obj.save()
                        self.stdout.write(self.style.SUCCESS(f"Loaded seed data from {filename}"))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Failed to load {filename}: {str(e)}"))